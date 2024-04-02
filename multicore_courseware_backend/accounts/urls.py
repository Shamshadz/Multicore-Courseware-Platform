from django.urls import path

from accounts import views


urlpatterns = [
    path("send-otp/", views.SendOtp.as_view(), name="send-otp"),
    path("verify-otp/", views.VerifyOtp.as_view(), name="verify-otp"),
    path("get-token/", views.get_token, name='get-token'),
    path("sign-up/", views.CreateUser.as_view(), name="sign-up"),
    path('logout/', views.LogoutView.as_view(), name ='logout'),
]