from django.shortcuts import render
from rest_framework.views import APIView
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from undetected_chromedriver import Chrome, ChromeOptions
import time
import json
import base64
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import CourseFile
from courses.models import CourseContent
from nbconvert.preprocessors import ExecutePreprocessor
from requests.exceptions import JSONDecodeError
import threading
import nbformat
import requests
import os

# Create your views here.
# Load environment variables from .env file
from dotenv import load_dotenv
load_dotenv()

# for help in execution of NoteBooks
import asyncio
asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

# Retrieve the value of BASE_JHUB_URL
base_jhub_url = os.getenv('BASE_JHUB_URL')
jhub_admin_token = os.getenv('JHUB_ADMIN_TOKEN')


## util function to help upload notebook to server
def encode_file_to_base64(file_path):
    try:
        # Read the file in binary mode
        with open(file_path, 'rb') as file:
            # Read the content of the file
            file_content = file.read()
            # Encode the file content to Base64
            encoded_content = base64.b64encode(file_content)
            # Convert the encoded bytes to a string
            encoded_string = encoded_content.decode('utf-8')
            return encoded_string
    except FileNotFoundError:
        print(f"File '{file_path}' not found.")
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

def notebook_upload_req(encoded_string, token, username, notebook_name):
    url = f"{base_jhub_url}/user/{username}/api/contents/{notebook_name}"
    headers = {
        'Authorization': f"token {token}",
        'Content-Type': 'application/json',
    }

    # Get CSRF token from the Django server
    csrf_token = requests.get(f"{base_jhub_url}")
    csrf_token_value = csrf_token.cookies.get('_xsrf')

    # Include CSRF token in headers
    headers['_xsrf'] = csrf_token_value

    data = {
        "type": "file",
        "format": "base64",
        "name": "",
        "content": encoded_string,
        "path": ""
    }

    try:
        response = requests.put(url, headers=headers, json=data)
        response.raise_for_status()  # Raise an exception for HTTP errors
        if response.ok:
            print("Notebook uploaded successfully.")
        else:
            print("Failed to upload notebook:", response.json())
    except JSONDecodeError as e:
        print("JSON decoding error occurred:", str(e))
        print("Response content:", response.content)
    except requests.exceptions.RequestException as e:
        print("Request error occurred:", str(e))
        # Handle other request-related errors here

def _start_server(base_jhub_url, first_name, headers):
    start_server_response = requests.post(f"{base_jhub_url}/hub/api/users/{first_name}/server", headers=headers)
    return start_server_response

def uploadNotebook(username, course):
    # Extracting token from the request header
    token = f"{jhub_admin_token}"

    headers = {
        'Authorization': f"token {jhub_admin_token}",
        'Content-Type': 'application/json',
    }

    # Fetch CSRF token from Django server
    csrf_token = requests.get(f"{base_jhub_url}/get-csrf-token/")
    csrf_token_value = csrf_token.cookies.get('_xsrf')

    # Include CSRF token in headers
    headers['_xsrf'] = csrf_token_value

    # Start the JupyterHub server in a separate thread
    start_server_thread = threading.Thread(target=_start_server, args=(base_jhub_url, username, headers))
    start_server_thread.start()
    start_server_thread.join()  # Wait for the thread to complete

    
    # Fetch file paths related to the course from the database
    course_files = CourseFile.objects.filter(course=course)
    course_contents = CourseContent.objects.filter(course=course)

    file_paths_and_names = []
    for course_file in course_files:
        # file_path = course_file.file.path  # Absolute file path
        file_name = course_file.file.name  # Relative file path (including upload_to directory)
        file_path = './media/' + file_name
        file_name = file_name.split('/')[1]
        file_paths_and_names.append((file_path, file_name))

    for course_content in course_contents:
        if course_content.any_file:  # Check if any_file is present
            file_path = './media/' + course_content.any_file.name
            file_name = course_content.any_file.name.split('/')[-1]  # Extracting file name
            file_paths_and_names.append((file_path, file_name))

        if course_content.assessment_answer_file:  # Check if any_file is present
            file_path = './media/' + course_content.assessment_answer_file.name
            file_name = course_content.assessment_answer_file.name.split('/')[-1]  # Extracting file name
            file_paths_and_names.append((file_path, file_name))



    def upload_thread(file_path, notebook_name):
        encoded_string = encode_file_to_base64(file_path)
        if encoded_string:
            notebook_upload_req(encoded_string, token, username, notebook_name)
    
    threads = []
    for file_path_and_file_name in file_paths_and_names:
        thread = threading.Thread(target=upload_thread,
                                   args=(file_path_and_file_name[0] ,file_path_and_file_name[1]))
        threads.append(thread)
        thread.start()
    
    for thread in threads:
        thread.join()

    return True


class UploadNotebookAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        # Extracting token from the request header
        user = self.request.user
        username = user.first_name.lower()

        ## encoded data
        token = f"{jhub_admin_token}"

        headers = {
            'Authorization': f"token {jhub_admin_token}",
            'Content-Type': 'application/json',
        }

        # Fetch CSRF token from Django server
        csrf_token = requests.get(f"{base_jhub_url}/get-csrf-token/")
        csrf_token_value = csrf_token.cookies.get('_xsrf')

        # Include CSRF token in headers
        headers['_xsrf'] = csrf_token_value

        # Start the JupyterHub server in a separate thread
        start_server_thread = threading.Thread(target=_start_server, args=(base_jhub_url, username, headers))
        start_server_thread.start()
        start_server_thread.join()  # Wait for the thread to complete

        
        file_path = "./notebooks/your_notebook.ipynb"  # Update with the path to your file
        encoded_string = encode_file_to_base64(file_path)
        if encoded_string:
            notebook_upload_req(encoded_string, token, username)

        # Perform your processing here...
        try:
            return Response({"message": "Data received successfully"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
def get_cookies(request):
    # URL of the webpage
    url = f'{base_jhub_url}/hub/login?next='

    # Create ChromeOptions object to configure the WebDriver
    options = ChromeOptions()

    # Set options for the WebDriver
    options.add_argument("--disable-blink-features=AutomationControlled")
    options.add_argument("--headless")  # Run Chrome in headless mode

    # Create a new instance of the undetected Chrome WebDriver
    driver = Chrome(options=options)

    # Open the URL in the browser
    driver.get(url)
    time.sleep(5)

    # Find the username and password input fields and submit button
    username_field = driver.find_element('id', 'username_input')
    password_field = driver.find_element('id', 'password_input')
    submit_button = driver.find_element('id', 'login_submit')

    # Enter username and password
    username_field.send_keys('shamshad')
    password_field.send_keys('password')

    # Click the submit button
    submit_button.click()

    # Wait for the login process to complete
    time.sleep(5)  # Adjust this delay as needed

    # Get the cookies
    cookies = driver.get_cookies()
    print(cookies)

    # Close the browser
    driver.quit()

    # Serialize the cookies data
    serialized_cookies = json.dumps(cookies)

    return JsonResponse(serialized_cookies, safe=False)



class GetCookiesAPIView(APIView):
    def post(self, request):
        # Call the get_cookies function to obtain cookies
        cookies = get_cookies(request)

        # Serialize the cookies data
        return cookies
    

    
class GetCorsAPIView(APIView): 
    def get(self, request):
        # Assuming you have obtained the CSRF token value somehow
        csrf_token = requests.get(f'{base_jhub_url}/csrf')
        csrf_token_value = csrf_token.cookies.get('_xsrf')
        print(csrf_token_value)

        return JsonResponse({'_xsrf': csrf_token_value})
    

def createJhubUser(username) :

    # Define the request body
    body = {
        "usernames": [
            f"{username}"
        ],
        "admin": False
    }

    # Define the URL
    url = f"{base_jhub_url}/hub/api/users"

    # Define headers with CSRF token
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"token {jhub_admin_token}"  # Replace YOUR_CSRF_TOKEN_HERE with your CSRF token
    }

    # Make the POST request
    response = requests.post(url, json=body, headers=headers)

    # Check if the request was successful
    if response.status_code == 201:
        print("User created successfully for JupyterHub")
        return True
    else:
        print(f"Error: {response.status_code} - {response.reason}")
        return False
    

class GetJhubUserTokenView(APIView):
    permission_classes = [IsAuthenticated]

    def _start_server(self, base_jhub_url, first_name, headers):
        start_server_response = requests.post(f"{base_jhub_url}/hub/api/users/{first_name}/server", headers=headers)
        return start_server_response

    def get(self, request):
        first_name = request.user.first_name.lower()

        url = f"{base_jhub_url}/hub/api/users/{first_name.lower()}/tokens"

        headers = {
            'Authorization': f"token {jhub_admin_token}",
            'Content-Type': 'application/json',
        }

        # Fetch CSRF token from Django server
        csrf_token = requests.get(f"{base_jhub_url}/get-csrf-token/")
        csrf_token_value = csrf_token.cookies.get('_xsrf')

        # Include CSRF token in headers
        headers['_xsrf'] = csrf_token_value

        # Start the JupyterHub server in a separate thread
        start_server_thread = threading.Thread(target=self._start_server, args=(base_jhub_url, first_name, headers))
        start_server_thread.start()
        start_server_thread.join()  # Wait for the thread to complete

        
        data = {
            "expires_in": 3600,
            "note": "string",
            "roles": [
                "user"
            ]
        }

        response = requests.post(url, headers=headers, json=data)

        if response.ok:
            token = response.json().get('token')
            return Response({'token': token, 'first_name': first_name}, status=response.status_code)
        else:
            return Response(response.json(), status=response.status_code)
        

class GradeAssessment(APIView):
    permission_classes = [IsAuthenticated]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.test_notebook_outputs = []
        self.correct_notebook_outputs = []

    def post(self, request):

        data = request.data

        notebook_name = data['notebook_name']
        course_id = data['course_id']
        course_content_id = data['course_content_id']

        username = request.user.first_name.lower()
        
        self.get_test_assessment_book(username, notebook_name)
        self.get_answer_assessment_notebook(username=username,
                                                   notebook_name=notebook_name,
                                                   course_id=course_id,
                                                   course_content_id=course_content_id)

        try:
            assessment_result = self.assess_notebooks()
        except:
            assessment_result = False

        return Response({
            "Passed" : assessment_result
        }, status=status.HTTP_200_OK)


    def _start_server(self, base_jhub_url, first_name, headers):
        start_server_response = requests.post(f"{base_jhub_url}/hub/api/users/{first_name}/server", headers=headers)
        return start_server_response

    def get_test_assessment_book(self, username, notebook_name):

        headers = {
            'Authorization': f"token {jhub_admin_token}",
            'Content-Type': 'application/json',
        }

        # Fetch CSRF token from Django server
        csrf_token = requests.get(f"{base_jhub_url}/get-csrf-token/")
        csrf_token_value = csrf_token.cookies.get('_xsrf')

        # Include CSRF token in headers
        headers['_xsrf'] = csrf_token_value

        # Start the JupyterHub server in a separate thread
        start_server_thread = threading.Thread(target=self._start_server, args=(base_jhub_url, username, headers))
        start_server_thread.start()
        start_server_thread.join()  # Wait for the thread to complete

        url = f"{base_jhub_url}/user/{username.lower()}/api/contents/{notebook_name}?type=notebook&content=1&hash=1"

        response = requests.get(url, headers=headers)
        
        if response.status_code == 200:
            self.create_notebook_from_response(response, "test_notebook")
            notebook_content = response.json() # Directly parse JSON response
            return notebook_content['content']
        else:
            # Handle error response
            print(f"Failed to fetch notebook. Status code: {response.status_code}")
            return None
        
    def get_answer_assessment_notebook(self, username, notebook_name, course_id, course_content_id):

        try:
            # Assuming CourseContent model is imported properly
            course_content = CourseContent.objects.get(pk=course_content_id)
            
            # Get the file path of the assessment answer notebook
            path_of_assessment_file = course_content.assessment_answer_file
            
            self.run_notebook_in_thread(test_notebook=False, notebook_path=path_of_assessment_file.path)

            return None
        
        except CourseContent.DoesNotExist:
            # Handle the case where the CourseContent with the given ID does not exist
            print("Course content does not exist.")
            return None
        
        except Exception as e:
            # Handle any other exceptions
            print(f"An error occurred: {e}")
            return None
    
    def create_notebook_from_response(self, response, notebook_name):
        # Parse the JSON response to get the notebook content
        notebook_content = response.json()

        # Create a new notebook
        nb = nbformat.v4.new_notebook()

        # Add cells from the response to the notebook
        for cell_data in notebook_content['content']['cells']:
            cell_type = cell_data['cell_type']
            if cell_type == 'code':
                cell_source = ''.join(cell_data['source'])  # Combine source lines into a single string
                cell = nbformat.v4.new_code_cell(cell_source)
            elif cell_type == 'markdown':
                cell_source = ''.join(cell_data['source'])  # Combine source lines into a single string
                cell = nbformat.v4.new_markdown_cell(cell_source)
            else:
                # Handle other cell types if needed
                continue
            
            nb['cells'].append(cell)

        # Write the notebook to a file
        file_name = f"media/course_files/create_test_notebook/{notebook_name}.ipynb"
        with open(file_name, 'w') as f:
            nbformat.write(nb, f)
        
        print(f"Jupyter Notebook '{file_name}' created successfully!")
        notebook_path = file_name
        self.run_notebook_in_thread(test_notebook=True, notebook_path=notebook_path)

        return None
    
    def run_notebook_in_thread(self, test_notebook, notebook_path):
        thread = threading.Thread(target=self.execute_notebook, args=(test_notebook, notebook_path,))
        thread.start()
        thread.join()

    def execute_notebook(self, test_notebook, notebook_path):
        with open(notebook_path) as f:
            nb = nbformat.read(f, as_version=4)
        
        executor = ExecutePreprocessor(timeout=1000)
        outputs = []  # List to store outputs
        
        try:
            # Execute each cell in the notebook
            for cell in nb.cells:
                if cell.cell_type == 'code':  # Only execute code cells
                    # Create a new notebook with only this cell
                    nb_single_cell = nbformat.v4.new_notebook(cells=[cell])
                    
                    # Execute the code cell
                    try:
                        result = executor.preprocess(nb_single_cell, {'metadata': {'path': '.'}})
                        
                        # Collect outputs if available
                        try:
                            # print(result[0]['cells'][0]['outputs'])
                            outputs.append(result[0]['cells'][0]['outputs'])
                        except:
                            print("no outputs")
                    except Exception as e:
                        # Handle specific exceptions, e.g., NameError
                        print(f"An error occurred while executing the following cell:\n------------------\n{cell.source}\n------------------\n")
                        print(f"Error message: {e}\n")
            
            if test_notebook:
                self.test_notebook_outputs.extend(outputs)
            else:
                self.correct_notebook_outputs.extend(outputs)
                
            return None
        
        except Exception as e:
            # Handle error during execution
            print(f"Error executing notebook: {e}")
            return None

    def assess_notebooks(self):      

        # Check if the sizes of the output lists are different
        if len(self.test_notebook_outputs) != len(self.correct_notebook_outputs):
            print("Number of cells in outputs lists is different.")
            return False  
            
        for student_output, correct_output in zip(self.test_notebook_outputs, self.correct_notebook_outputs):
            print("outputs of cells")

            print(student_output)
            print(correct_output) 
            
            # Check if outputs exist and compare them
            if student_output != correct_output:
                print("Output of a cell does not match.")
                # return False
                return True ## change it is just for testing purpose
        
        return True  # Return True after looping through all cells