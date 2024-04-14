import nbformat

# Data received from the API
api_data = {
    "name": "OpenMP_assess_1.ipynb",
    "path": "OpenMP_assess_1.ipynb",
    "last_modified": "2024-04-14T06:06:13.593469Z",
    "created": "2024-04-14T06:06:13.593469Z",
    "content": {
        "cells": [
            {
                "cell_type": "code",
                "execution_count": 4,
                "id": "7341745f-dce6-4bd0-ae3e-8534494ef09e",
                "metadata": {
                    "trusted": True
                },
                "outputs": [],
                "source": "def add_function():\n    # Prompt the user to enter the first number\n    num1 = 4\n\n    # set correct value of x\n    \n    # Prompt the user to enter the second number\n    num2 = x\n\n    # Add the two numbers\n    return  num1 + num2"
            },
            {
                "cell_type": "code",
                "execution_count": 5,
                "id": "76ae5350-5f43-455b-baf8-6d7f1d1f078f",
                "metadata": {
                    "trusted": True
                },
                "outputs": [
                    {
                        "data": {
                            "text/plain": "8"
                        },
                        "execution_count": 5,
                        "metadata": {},
                        "output_type": "execute_result"
                    }
                ],
                "source": "add_function()"
            }
        ],
        "metadata": {
            "kernelspec": {
                "display_name": "Python 3 (ipykernel)",
                "language": "python",
                "name": "python3"
            },
            "language_info": {
                "codemirror_mode": {
                    "name": "ipython",
                    "version": 3
                },
                "file_extension": ".py",
                "mimetype": "text/x-python",
                "name": "python",
                "nbconvert_exporter": "python",
                "pygments_lexer": "ipython3",
                "version": "3.10.10"
            }
        },
        "nbformat": 4,
        "nbformat_minor": 5
    },
    "format": "json",
    "mimetype": None,
    "size": 1294,
    "writable": True,
    "hash": "f2b8ecfea9ada4cef12f422c4492204f1bddd59b3ecf59f9720700d702d36362",
    "hash_algorithm": "sha256",
    "type": "notebook"
}

# Create a new notebook object
notebook = nbformat.v4.new_notebook()

# Add cells to the notebook
for cell_data in api_data["content"]["cells"]:
    cell = nbformat.v4.new_code_cell(source=cell_data["source"])
    notebook.cells.append(cell)

# Save the notebook to a file
output_file = "output_notebook.ipynb"
with open(output_file, "w") as f:
    nbformat.write(notebook, f)

print(f"Notebook saved to {output_file}")
