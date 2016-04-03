from rest_framework import permissions, viewsets
from rest_framework.response import Response
from rest_framework import status, views
from django.contrib.auth import authenticate, login, logout

from users.models.user import UserModel
from users.permissions.user import UserPermission
from users.serializers.user import UserSerializer

import json


class UserViewSet(viewsets.ModelViewSet):
    lookup_field = 'id'
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer
    permission_classes = (UserPermission, )

    def create(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():

            UserModel.objects.create_user(**serializer.validated_data)

            return Response(serializer.validated_data,
                            status=status.HTTP_201_CREATED)

        return Response({
            'status': 'Bad request',
            'message': 'User not created , wrong data or repeated.'
        }, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(views.APIView):

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = json.loads(request.body)

        email = data.get('email', None)
        password = data.get('password', None)

        user = authenticate(email=email, password=password)

        if user is not None:
            if user.is_active:
                login(request, user)

                serialized = UserSerializer(user)

                return Response(serialized.data)
            else:
                return Response({
                    'status': 'Unauthorized',
                    'message': 'not authorized'
                }, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({
                'status': 'Unauthorized',
                'message': 'Username/password invalid.'
            }, status=status.HTTP_401_UNAUTHORIZED)



class UserLogoutView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        logout(request)

        return Response({}, status=status.HTTP_204_NO_CONTENT)
