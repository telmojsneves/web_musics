from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework import permissions

from musics.models.music import MusicModel
from musics.serializers.music import MusicSerializer
from users.models.user import UserModel

from  django.core.exceptions import ObjectDoesNotExist


class MyMusicViewSet(viewsets.ViewSet):

    # set permission only if Authenticated
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def list(self, request):

        try:
            user = UserModel.objects.get(pk=request.user.pk)
            musics_user = user.musics.all()

            serializer = MusicSerializer(musics_user, many=True)

            return Response(serializer.data)
            # all musics of this user serialized with musicserializer

        except ObjectDoesNotExist:
            return Response({}, status.HTTP_204_NO_CONTENT)


    def create(self, request):

        music_id = request.data.get('music_id', 0)
        user_id = request.user.pk

        user = UserModel.objects.get(pk=user_id)

        if (music_id != 0):
            try:
                user.musics.add(music_id)
                return Response({'status_code': 200})
            except IntegrityError:
                print "IntegrityError"

        return Response({'status_code': 409})

    def destroy(self, request, pk=None):

        user = UserModel.objects.get(pk=request.user.pk)

        user.musics.remove(pk)

        return Response({'status_code': 200})
