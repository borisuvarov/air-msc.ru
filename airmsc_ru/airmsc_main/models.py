from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)


class MemberManager(BaseUserManager):
    def create_user(self, email, password=None):
        user = self.model(
            email=self.normalize_email(email),
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        user = self.create_user(email,
                                password=password,
                                )
        user.is_admin = True
        user.is_active = True
        user.save(using=self._db)
        return user


class Member(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='email',
        max_length=255,
        unique=True,
    )
    is_active = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True, auto_now=False)

    objects = MemberManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def get_full_name(self):
        return self.email

    def get_short_name(self):
        return self.email

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin


class MemberData(models.Model):
    member = models.ForeignKey(Member)
    activation_hash = models.CharField(max_length=100)
    donskoyshabolovka = models.BooleanField()
    donskoychura = models.BooleanField()
    danilovskiy = models.BooleanField()
    zapbirulovo = models.BooleanField()
    orekhovo = models.BooleanField()
    tsarytsyno = models.BooleanField()
    konkovo = models.BooleanField()
    akademicheskiy = models.BooleanField()
    gagarinskiy = models.BooleanField()
    southbutovo = models.BooleanField()
    marinskiypark = models.BooleanField()
    lyblinogolovach = models.BooleanField()
    lublinosovkhoz = models.BooleanField()
    ryazanskiy = models.BooleanField()
    kapotnya = models.BooleanField()
    pechatniki = models.BooleanField()
    losiniyostrov = models.BooleanField()
    kosino = models.BooleanField()
    kozhuhovo = models.BooleanField()
    meschansky = models.BooleanField()
    basmanniykazakova = models.BooleanField()
    basmanniyspartak = models.BooleanField()
    presnenskiy = models.BooleanField()
    tverskoy = models.BooleanField()
    khamovniki = models.BooleanField()
    bogorodskoe = models.BooleanField()
    southmedvedkovo = models.BooleanField()
    ostankinskiy = models.BooleanField()
    aeroport = models.BooleanField()
    savelovskiy = models.BooleanField()
    dmitrovskiy = models.BooleanField()
    sokol = models.BooleanField()
    pokrovskoestreshnevo = models.BooleanField()
    northtushino = models.BooleanField()
    khoroshevomnevniki = models.BooleanField()
    ramenki = models.BooleanField()
    troparevonikulino = models.BooleanField()
    mozhaisky = models.BooleanField()
    dorogomilovo = models.BooleanField()
    scherbinka = models.BooleanField()
    salarievo = models.BooleanField()

    def __str__(self):
        return str(self.member)

    class Meta:
        verbose_name_plural = "MemberData"
        verbose_name = "MemberData"
