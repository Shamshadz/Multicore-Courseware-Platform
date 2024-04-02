from django.shortcuts import render
from rest_framework.views import APIView
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from undetected_chromedriver import Chrome, ChromeOptions
import time
from django.core.serializers.json import DjangoJSONEncoder
import json
import base64
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
import requests
# Create your views here.


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


def notebook_upload_req(encoded_string, token):
    url = 'http://192.168.56.3/user/shamshad/api/contents/your_notebook.ipynb'
    headers = {
        'Authorization': f"token {token}",
        'Content-Type': 'application/json',
    }

    # Get CSRF token from the Django server
    csrf_token = requests.get('http://192.168.56.3')
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

    response = requests.put(url, headers=headers, json=data)
    if response.ok:
        print("Notebook uploaded successfully.")
    else:
        print("Failed to upload notebook:", response.json())


def uploadNotebook(username):
    # Extracting token from the request header

    ## encoded data
    token = "a59b90543f0a4546b083feef028883ed"
    file_path = "./notebooks/your_notebook.ipynb"  # Update with the path to your file
    encoded_string = encode_file_to_base64(file_path)
    if encoded_string:
        notebook_upload_req(encoded_string, token, username)


class UploadNotebookAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        # Extracting token from the request header
        

        ## encoded data
        token = "a59b90543f0a4546b083feef028883ed"
        file_path = "./notebooks/your_notebook.ipynb"  # Update with the path to your file
        encoded_string = encode_file_to_base64(file_path)
        if encoded_string:
            notebook_upload_req(encoded_string, token)

        # Perform your processing here...
        try:
            return Response({"message": "Data received successfully"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
def get_cookies(request):
    # URL of the webpage
    url = 'http://192.168.56.3/hub/login?next='

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
        csrf_token = requests.get('http://192.168.56.3/csrf')
        csrf_token_value = csrf_token.cookies.get('_xsrf')
        print(csrf_token_value)

        return JsonResponse({'_xsrf': csrf_token_value})
    

import requests
def createJhubUser(username) :

    # Define the request body
    body = {
        "usernames": [
            f"{username}"
        ],
        "admin": False
    }

    # Define the URL
    url = "http://192.168.56.3/hub/api/users"

    # Define headers with CSRF token
    headers = {
        "Content-Type": "application/json",
        "Authorization": "token a59b90543f0a4546b083feef028883ed"  # Replace YOUR_CSRF_TOKEN_HERE with your CSRF token
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