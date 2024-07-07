from django.urls import path
from .views import TodoListView, TodoDeleteView, TodoUpdateView, TodoUpdateCompletionView, PasswordResetView, PasswordResetConfirmView, ServerStatusView

urlpatterns = [
    path('todos/', TodoListView.as_view(), name="todo_list"),
    path('todos/update/<int:pk>/', TodoUpdateView.as_view(), name="todo_update"),
    path('todos/<int:pk>/complete/', TodoUpdateCompletionView.as_view(), name="todo_complete"),
    path('todos/delete/<int:pk>/', TodoDeleteView.as_view(), name="todo_delete"),
    path('password-reset/', PasswordResetView.as_view(), name='password_reset'),
    path('password-reset-confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('server-status/', ServerStatusView.as_view(), name="server-status")
]