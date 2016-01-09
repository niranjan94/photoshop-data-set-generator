from distutils.core import setup
import py2exe

setup(
    options={
        'py2exe': {
            'bundle_files': 1,
            'compressed': True,
            'optimize': 2
        }},
    zipfile=None,
    console=[{
        "script": "app.py",
        "dest_base": "IDCardGenerator",
        'uac_info': "requireAdministrator",
    }],
)