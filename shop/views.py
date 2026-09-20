from django.shortcuts import render

# Create your views here.
def homePage(request):
    return render (request, 'pages/home_page.html')


def productPage(request):
    return render (request, 'pages/products_page.html')

def detailsPage(request):
    return render (request, 'pages/details_page.html')