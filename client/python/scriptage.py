import pandas as pd
import json
import pickle
import numpy as np
import sys
from sklearn.metrics import r2_score


def age_estim(data_json, dico):
    df = pd.DataFrame(json.loads(data_json))
    X = df[['haut_tronc', 'tronc_diam', 'fk_stadedev', 'clc_nbr_diag', 'fk_nomtech', 'haut_tot']]
    Y = df[['age_estim']]
    X['fk_stadedev'] = pd.DataFrame(dico["encoder"].transform(X[['fk_stadedev']]))
    X['fk_nomtech'] = pd.DataFrame(dico["encoderlabel"].transform(X[['fk_nomtech']]))
    X = dico["scaler_feature"].transform(X)

    pred = dico["RandomForest"].predict(X)
    pred = pred.reshape(-1, 1)
    pred = dico["scaler_age"].inverse_transform(pred)
    print("r2_score", r2_score(Y, pred))

    age_estimated = pd.DataFrame(pred, columns=['age_estim'])

    age_estimated_json = age_estimated.to_json(orient='records')
    with open("age_estim.json", "w") as f:
        f.write(age_estimated_json)

    return age_estimated_json



# récupérer l'argument
data_json = sys.argv[1]

with open("cornichon.pkl", "rb") as f:
    dico = pickle.load(f)

result = age_estim(data_json, dico)
print(result)


