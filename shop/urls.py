from django.urls import path, include
from .views import homePage, productPage, detailsPage


urlpatterns = [
    path('home_page/', homePage),
    path('products_page/', productPage),
    path('details_page/', detailsPage),
]