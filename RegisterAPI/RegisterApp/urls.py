from django.urls import path
from RegisterApp import views

from django.urls import re_path as url

urlpatterns=[
    url(r'^register$',views.registerAPI),
    url(r'^register/([0-9]+)$',views.registerAPI),
    url(r'^register/print/([0-9]+)/([0-9]+)*$',views.registerPrint),
    url(r'^specific-function$',views.SFAPI),
    url(r'^specific-function/([0-9]+)$',views.SFAPI),
    url(r'^specific-function/print/([0-9]+)/([0-9]+)*$',views.SFPrint)
]