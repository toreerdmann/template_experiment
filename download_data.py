
import firebase_admin
from firebase_admin import credentials, firestore, db
import json
import sys
import os
import types
# setup client
cred = credentials.Certificate('my_certificate.json')
default_app = firebase_admin.initialize_app(cred)
client      = firestore.client()
print('Argument List:', str(sys.argv))
collname = str(sys.argv[1])
[print(subj.id) for subj in client.collection(collname).stream()]
def get_documents(d):
    if isinstance(d, firestore.DocumentReference):
        return (get_documents(d.get()), get_documents(d.collections()))
    elif isinstance(d, firestore.DocumentSnapshot):
        rval = {}
        rval["id"] = d.id
        rval["fields"] = d.to_dict()
        return rval
    elif isinstance(d, firestore.CollectionReference):
        rval = {}
        for doc in d.stream():
            rval[doc.id] = get_documents(doc)
        return rval
    elif isinstance(d, types.GeneratorType):
        rval = {}
        for i in d:
            rval[i.id] = get_documents(i)
        return rval
    else:
        print("unpack for type: {} not implemented".format(type(d)))
        return 0
coll_experiment = client.collection(collname)
# directory to save data in
directory = 'data/raw/%s' %collname
if not os.path.exists(directory):
    os.makedirs(directory)
for (subj, subj_doc) in enumerate(coll_experiment.list_documents()):
    rval = get_documents(subj_doc)
    with open("data/raw/{}/{}.json".format(collname, subj), 'w') as f:
        json.dump(rval, f)
print("done.\n")
