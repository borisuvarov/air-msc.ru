from django import forms
from .models import Member


class MemberModelForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super(forms.ModelForm, self).__init__(*args, **kwargs)
        self.fields['email'].error_messages = {
            'required': 'Поле не может быть пустым',
            'null': 'null',
            'blank': 'blank',
            'unique': 'Вы уже подписались'
        }
        self.fields['password'].error_messages = {
            'required': 'Поле не может быть пустым',
            'null': 'null',
            'blank': 'blank',
        }
        self.fields['email'].widget.attrs['class'] = 'form-control input-lg'
        # self.fields['email'].widget.attrs['placeholder'] = 'Введите email'
        self.fields['password'].widget.attrs['class'] = 'form-control input-lg'
        # self.fields['password'].widget.attrs['placeholder'] = 'Введите пароль'

    class Meta:
        model = Member
        fields = ['email', 'password']
        widgets = {}
        widgets['email'] = forms.EmailInput()
        widgets['password'] = forms.PasswordInput()
