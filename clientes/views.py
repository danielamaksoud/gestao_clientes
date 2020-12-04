from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from .models import Person
from .forms import PersonForm

from django.core import serializers
import json

# Create your views here.

@login_required
def persons_list(request):
    persons = Person.objects.all() # SELECT * FROM PERSON
    return render(request, 'person.html', {'persons': persons})

@login_required
def persons_new(request):
    form = PersonForm(request.POST or None, request.FILES or None)
    
    if form.is_valid():
        form.save()
        return redirect('person_list')
    
    return render(request, 'person_form.html', {'form': form})

@login_required
def persons_update(request, id):
    person = get_object_or_404(Person, pk=id)
    form = PersonForm(request.POST or None, request.FILES or None, instance = person)
    
    if form.is_valid():
        form.save()
        return redirect('person_list')
    
    return render(request, 'person_form.html', {'form': form})

@login_required
def persons_delete(request, id):
    person = get_object_or_404(Person, pk=id)
    #form = PersonForm(request.POST or None, request.FILES or None, instance = person)
    
    if request.method == 'POST':
        person.delete()
        return redirect('person_list')
    
    return render(request, 'person_delete_confirm.html', {'person': person})

@login_required
def persons_search(request):
    first_name = request.GET.get('first_name')
    # SELECT * FROM PERSONS WHERE FIRST_NAME LIKE '%nome-qualquer'
    persons = Person.objects.filter(first_name__startswith=first_name)
    persons = [ person_serializer(person) for person in persons ]
    return HttpResponse(json.dumps(persons), content_type='application/json')

def person_serializer(person):
    return {'first_name': person.first_name, 'last_name': person.last_name}
    
    
    