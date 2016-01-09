from bottle import run, static_file, get, post, request
from nameparser import HumanName
import os
import datetime
import csv
from multiprocessing import freeze_support, Process


initialised = False
folder_name = datetime.datetime.now().strftime('%Y-%m-%d_%H-%M-%S')

def initialise():
    global initialised, folder_name
    initialised = True
    folder_name = datetime.datetime.now().strftime('%Y-%m-%d_%H-%M-%S')
    os.makedirs(folder_name)
    with open(folder_name + "/" + folder_name + ".csv", 'ab+') as csv_file:
        fieldnames = ['firstname', 'lastname', 'designation', 'department', 'photo']
        csv_writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
        csv_writer.writeheader()

# Static Routes
@get('/<filename:re:.*\.js>')
def javascripts(filename):
    return static_file(filename, root='ui')

@get('/<filename:re:.*\.css>')
def stylesheets(filename):
    return static_file(filename, root='ui')

@get('/<filename:re:.*\.(jpg|png|gif|ico)>')
def images(filename):
    return static_file(filename, root='ui')

@get('/<filename:re:.*\.(eot|ttf|woff|svg)>')
def fonts(filename):
    return static_file(filename, root='ui')

@post('/add')
def add():
    global initialised
    if not initialised:
        initialise()

    name = HumanName(request.forms.get('name'))
    first_name = name.first.upper()
    last_name = name.last.upper()
    department = request.forms.get('department').upper()
    designation = request.forms.get('designation').upper()
    photo = request.files.get('photo')
    name, ext = os.path.splitext(photo.filename)
    if ext not in ('.png', '.jpg', '.jpeg', '.JPG', '.JPEG', '.PNG'):
        rv = {"status": "photo_invalid"}
        return dict(rv)

    if not os.path.exists(folder_name + "/images/"):
        os.makedirs(folder_name + "/images/")

    name = first_name + "_" + last_name + "_" + department + "_" + designation
    photo.filename = name.replace(" ", "_") + ext
    photo.save(folder_name + "/images/")

    with open(folder_name + "/" + folder_name + ".csv", 'ab+') as csv_file:
        fieldnames = ['firstname', 'lastname', 'designation', 'department', 'photo']
        csv_writer = csv.DictWriter(csv_file, fieldnames=fieldnames)

        csv_writer.writerow({
          'firstname': first_name,
          'lastname': last_name,
          'department': department,
          'designation': designation,
          'photo': "images/"+photo.filename
        })

    rv = {"status": "ok"}
    return dict(rv)

@post('/next-batch')
def next_batch():
    global initialised
    current_folder = folder_name
    initialised = False
    rv = {"status": "ok", "prev_batch": os.getcwd() + "\\" + current_folder}
    return dict(rv)

@get('/')
def index():
    return static_file('index.html', root='ui')

def start_server():
    run(host='localhost', port=8888)

if __name__ == "__main__":
    freeze_support()
    print "\nStarting ...\n"
    http_process = Process(target=start_server)
    http_process.start()
    raw_input("")
