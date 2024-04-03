from rest_framework import generics, serializers, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.exceptions import PermissionDenied

from .models import (Course, Enrollment, CourseContent)
from .serializers import (CourseListSerializer, CourseDetailSerializer,
                          EnrollmentListSerializer, EnrollmentCreateSerializer,
                          CourseContentSerializer)
from notebook_utlis.views import uploadNotebook

class CourseListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]  # Add authentication permission
    queryset = Course.objects.all()
    serializer_class = CourseListSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            "status": "success",
            "message": "Course list retrieved successfully",
            "data": serializer.data
        }, status=status.HTTP_200_OK)



class CourseDetailView(generics.RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseDetailSerializer
    lookup_field = 'pk'  # Assuming primary key is used for lookup

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({
            "status": "success",
            "message": "Course details retrieved successfully",
            "data": serializer.data
        }, status=status.HTTP_200_OK)
    
class EnrollmentListView(generics.ListAPIView):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentListSerializer


class EnrollmentCreateView(generics.CreateAPIView):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentCreateSerializer

    def perform_create(self, serializer):
        # Get the user from the request
        user = self.request.user
        username = user.first_name
        
        # Get the course from the serializer data
        course = serializer.validated_data['course']

        # Check if an enrollment with the same course and user already exists
        if Enrollment.objects.filter(user=user, course=course).exists():
            # If exists, return a conflict response
            raise serializers.ValidationError("Enrollment already exists for this user and course.")

        uploaded = uploadNotebook(username.lower())
        if uploaded :
            # Create the enrollment
            serializer.save(user=user)

class EnrollmentListDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Filter the queryset based on the current user
        user = request.user
        enrollments = Enrollment.objects.filter(user=user)
        
        # Serialize the queryset
        serializer = EnrollmentListSerializer(enrollments, many=True)
        
        # Return the serialized data
        return Response(serializer.data)
    
class CourseContentView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, course_id):
        try:
            # Check if the requesting user is enrolled in the specified course
            if not Enrollment.objects.filter(user=request.user, course=course_id).exists():
                raise PermissionDenied("You are not enrolled in this course.")

            # Retrieve course content for the given course_id
            course_content = CourseContent.objects.filter(course=course_id)
            serializer = CourseContentSerializer(course_content, many=True)
            return Response({
                "status": "success",
                "message": "Course content retrieved successfully",
                "data": serializer.data
            }, status=200)
        except PermissionDenied as e:
            return Response({
                "status": "error",
                "message": str(e)
            }, status=403)
        except Exception as e:
            return Response({
                "status": "error",
                "message": "Failed to retrieve course content",
                "error": str(e)
            }, status=500)