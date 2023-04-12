import datetime
from django.db import models
from django.core.exceptions import ValidationError

def integer_poz_validator(value):
    if value > 0:
        return value
    else:
        raise ValidationError("This field does not accept negative values. Stay positive! :) .")


def not_current_date(value):
    current_date = datetime.date.today()
    if value.date() <= current_date:
        return value
    else:
        raise ValidationError("That time has already passed!")

def name_is_alphabetic(value):
    if value. isalpha():
        return value
    else:
        raise ValidationError("What kind of parents gave you that name!?")


def capacity_validator(value):
    if value < 30:
        return value
    else:
        raise ValidationError("We cant feed an entire african tribe!")


class Restaurant(models.Model):
   # id= models.IntegerField(primary_key=True)
    name= models.CharField(max_length=200)
    adress=models.CharField(max_length=200)
    phone_number=models.CharField(max_length=200)
    cuisine_type=models.CharField(max_length=200)
    is_vegetarian_friendly=models.BooleanField()

# one to many between menu and restaurant - one restaurant can have different menus
class Menu(models.Model):
    id=models.IntegerField(primary_key=True)
    description=models.CharField(max_length=200)
    price=models.IntegerField(validators=[integer_poz_validator])
    chef_specialty=models.CharField(max_length=200)
    name=models.CharField(max_length=200)
    restaurant=models.ForeignKey(Restaurant, on_delete=models.CASCADE)

class Customer(models.Model):
    id=models.IntegerField(primary_key=True)
    first_name = models.CharField(max_length=100,validators=[name_is_alphabetic])
    last_name=models.CharField(max_length=200)
    phone_number = models.CharField(max_length=20)
    age=models.IntegerField()
    gender=models.CharField(max_length=200)

# type - birthday, regular , etc
# many to many between restaurant and customer
class Reservation(models.Model):
    id=models.IntegerField(primary_key=True)
    customer_id=models.ForeignKey(Customer, on_delete=models.CASCADE)
    restaurant_id=models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    date= models.DateTimeField(validators=[not_current_date])
    number_of_persons=models.IntegerField(validators=[capacity_validator])
    type=models.CharField(max_length=200)

class MenuPriceDto:
    def __init__(self,restaurant_id, average_price):
        self.restaurant_id=restaurant_id
        self.average_price=average_price