
"""ubi URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""

from django.conf.urls import url, include
from django.contrib import admin
from rest_framework import routers

# API view sets essentials
from users.api.user import UserViewSet
from users.api.user import UserLoginView
from users.api.user import UserLogoutView

from musics.api.music import MusicViewSet
from musics.api.mymusics import MyMusicViewSet


# from django.views.generic import TemplateView
from ubi.views import IndexView


router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'musics', MusicViewSet)
router.register(r'me', MyMusicViewSet, base_name="me")

# urlpatterns = router.urls

# django admin
urlpatterns = [
    url(r'^api/v1/', include(router.urls)),
    url(r'^admin/', admin.site.urls),
    url(r'^auth/', include('rest_framework.urls',
        namespace='rest_framework')),
    url(r'^api/v1/auth/login/$', UserLoginView.as_view(), name='login'),
    url(r'^api/v1/auth/logout/$', UserLogoutView.as_view(), name='logout'),
    # any other than above
    url('^.*$', IndexView.as_view(), name='index'),


]
