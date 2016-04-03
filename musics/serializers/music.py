from rest_framework import serializers
from musics.models import MusicModel

from users.serializers.user import UserSerializer


class MusicSerializer(serializers.HyperlinkedModelSerializer):

    # users = UserSerializer(many=True, read_only=True)
    users = UserSerializer(many=True, read_only=True)

    class Meta:
        model = MusicModel
        fields = ('title', 'artist', 'album', 'id', 'users')
