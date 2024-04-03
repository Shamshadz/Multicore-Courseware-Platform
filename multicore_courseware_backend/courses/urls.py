from django.urls import path
from courses import views

urlpatterns = [
    path("course-list/", views.CourseListView.as_view(), name="list-courses"),
    path('course/detail/<int:pk>/', views.CourseDetailView.as_view(), name='course-detail'),
    path('enrollments-list/', views.EnrollmentListView.as_view(), name='enrollment-list'),
    path('enrollments-create/', views.EnrollmentCreateView.as_view(), name='enrollment-create'),
    path('enrollments-list-detail/', views.EnrollmentListDetailView.as_view(), name='enrollment-list-detail'),
    path('<int:course_id>/content/', views.CourseContentView.as_view(), name='course_content'),
]