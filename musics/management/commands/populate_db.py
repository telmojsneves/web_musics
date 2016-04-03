from django.core.management.base import BaseCommand
from django.db import IntegrityError
import urllib2
import json

from musics.models.music import MusicModel


class Command(BaseCommand):
    args = '<url max>'
    help = 'populate music app'

    base_url = "http://freemusicarchive.org/recent.json"
    json_data = []
    obj_list = []

    def get_field(self, field, element):
        if field in element:
            return element[field]
        return None

    def create_object(self, album, artist, title):
        obj = MusicModel(album=album,
                         artist=artist,
                         title=title)

        return obj

    def get_object(self, element):
        artist_title = self.get_field("artist_name", element)
        album_title = self.get_field("album_title", element)
        music_title = self.get_field("track_title", element)

        return self.create_object(album_title, artist_title, music_title)

    def extract_json(self):
        response = urllib2.urlopen(self.base_url)
        self.json_data = json.load(response)
        return

    def treat_json(self):

        if 'aTracks' not in self.json_data:
            return None

        for element in self.json_data['aTracks']:
            obj = self.get_object(element)
            self.obj_list.append(obj)

    def populate_music_database(self):

        if self.obj_list:
            try:
                MusicModel.objects.bulk_create(self.obj_list)
            except IntegrityError:
                print "Partial data already in file, analyse row by row"

    def handle(self, *args, **options):

        if args:
            base_url = args[0]

        self.extract_json()
        self.treat_json()
        self.populate_music_database()
