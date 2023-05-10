
# Experiment template 

This folder contains the example code for the blog post at
()[www.toreerdmann.it/data-saving.html].


## Usage

### Collecting data with firebase

1. Setup your firebase account with the firestore service.
2. Replace the contents of `firebase_setup.js` with your firebase config (look for "SDK setup and configuration" on the firebase console).
3. Setup anonymous authentification for you firebase project.

Open `index.html` with a web browser and it should just work. You'll see a
message with "uid: ..." with the user ID assigned to your session (which will
be used to save the data on the server) on the developer console of your browser.

### Downloading the data 

We are using a python script for this: `download_data.py`. You need to obtain a
firebase admin certificate. Look for "service accounts", "Firebase Admin SDK"
and generate a private key for your project. It should be an .json file that
you then copy into this folder, and name it `my_certificate.json`. This will be
used in the pyhon script to login to your firebase to be able to download the
data.

After, you just download the data from the terminal by calling:
    
    python download_data.py experiment-1

where 'experiment-1' is the name of the collection (set at the top of `exp.js`),
which you can use to keep data from different experiments or versions apart from
each other.

You might need to have the `firebase_admin` installed on python. I am not sure
what is the best way to get there, I did something like

    pip install firebase_admin

but there may be different ways depending on your machine.

