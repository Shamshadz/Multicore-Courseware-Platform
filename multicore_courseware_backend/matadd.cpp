#include <iostream>
#include <omp.h>

void matrix_addition(int** A, int** B, int** C, int rows, int cols) {
    #pragma omp parallel for collapse(2)
    for (int i = 0; i < rows; ++i) {
        for (int j = 0; j < cols; ++j) {
            C[i][j] = A[i][j] + B[i][j];
        }
    }
}

int main() {
    const int rows = 3;
    const int cols = 3;

    // Allocate memory for matrices
    int** A = new int*[rows];
    int** B = new int*[rows];
    int** C = new int*[rows];

    for (int i = 0; i < rows; ++i) {
        A[i] = new int[cols];
        B[i] = new int[cols];
        C[i] = new int[cols];
    }

    // Initialize matrices A and B
    for (int i = 0; i < rows; ++i) {
        for (int j = 0; j < cols; ++j) {
            A[i][j] = i + j;
            B[i][j] = i - j;
        }
    }

    // Perform matrix addition
    matrix_addition(A, B, C, rows, cols);

    // Print the result matrix
    std::cout << "Resultant Matrix:\n";
    for (int i = 0; i < rows; ++i) {
        for (int j = 0; j < cols; ++j) {
            std::cout << C[i][j] << " ";
        }
        std::cout << std::endl;
    }

    // Free memory
    for (int i = 0; i < rows; ++i) {
        delete[] A[i];
        delete[] B[i];
        delete[] C[i];
    }
    delete[] A;
    delete[] B;
    delete[] C;

    return 0;
}
