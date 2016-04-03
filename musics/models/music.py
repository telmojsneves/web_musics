from django.db import models

from users.models.user import UserModel


class MusicModel(models.Model):

    # id is already defined, for large values use BigInt
    title = models.CharField(max_length=127, null=True)
    artist = models.CharField(max_length=127, null=True)
    album = models.CharField(max_length=127, null=True)

    users = models.ManyToManyField(UserModel, related_name="musics")

    class Meta:
        verbose_name_plural = 'musics'
        ordering = ('id',)
        unique_together = ('title', 'artist')
