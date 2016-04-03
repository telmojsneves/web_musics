from rest_framework import permissions


class UserPermission(permissions.BasePermission):
    # def has_permission(self,):

    def get_permissions(self):

        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        if self.request.method == 'POST':
            return (permissions.AllowAny(),)

        return (permissions.IsAuthenticated(), UserPermission(),)

    def has_object_permission(self, request, view, user):
        if request.user:
            return user == request.user
        return False

"""
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the snippet.
        return obj.owner == request.user

"""
