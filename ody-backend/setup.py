from setuptools import setup, find_packages

setup(
    name='odybackend',
    version='0.1.0',
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        'Flask',
        'flask-cors',
        'SQLAlchemy',
        'psycopg2-binary',
        # Add other dependencies as needed
    ],
)
