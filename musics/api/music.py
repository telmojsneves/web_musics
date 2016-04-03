from musics.models.music import MusicModel
from musics.serializers.music import MusicSerializer

from rest_framework import viewsets
from rest_framework import permissions


class MusicViewSet(viewsets.ModelViewSet):

    queryset = MusicModel.objects.all().order_by('-id')
    serializer_class = MusicSerializer
    permission_classes = (permissions.IsAuthenticated,)
