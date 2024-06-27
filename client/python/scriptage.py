import pandas as pd
import json
import pickle
import numpy as np
import sys
from sklearn.metrics import r2_score

import pandas as pd
import json
import pickle
import numpy as np
import sys
from sklearn.metrics import r2_score

def age_estim(data_json, cornichons):
    try:
        data = json.loads(data_json)

        df = pd.DataFrame(data)
        X = df[['haut_tronc', 'tronc_diam', 'fk_stadedev', 'clc_nbr_diag', 'fk_nomtech', 'haut_tot']]

        # Encodage et mise à l'échelle
        X['fk_stadedev'] = pd.DataFrame(cornichons["encoder"].transform(X[['fk_stadedev']]))
        X['fk_nomtech'] = pd.DataFrame(cornichons["encoderlabel"].transform(X[['fk_nomtech']]))
        X = cornichons["scaler_feature"].transform(X)

        # Prédictions avec RandomForest
        pred_rf = cornichons["RandomForest"].predict(X)
        pred_rf = pred_rf.reshape(-1, 1)
        pred_rf = cornichons["scaler_age"].inverse_transform(pred_rf)
        df['age_estim_RandomForest'] = pred_rf

        # Prédictions avec DecisionTree
        pred_dt = cornichons["DecisionTree"].predict(X)
        pred_dt = pred_dt.reshape(-1, 1)
        pred_dt = cornichons["scaler_age"].inverse_transform(pred_dt)
        df['age_estim_DecisionTree'] = pred_dt

        # Prédictions avec MLP
        pred_mlp = cornichons["MLP"].predict(X)
        pred_mlp = pred_mlp.reshape(-1, 1)
        pred_mlp = cornichons["scaler_age"].inverse_transform(pred_mlp)
        df['age_estim_MultiLayerPercetron'] = pred_mlp

        # Prédictions avec GradientBoosting
        pred_gb = cornichons["GradientBoosting"].predict(X)
        pred_gb = pred_gb.reshape(-1, 1)
        pred_gb = cornichons["scaler_age"].inverse_transform(pred_gb)
        df['age_estim_GradientBoosting'] = pred_gb

        # Renvoie tout le dataframe formaté en json
        age_estimated_json = df.to_json(orient='records')

        # Écriture du résultat dans un fichier JSON
        print(age_estimated_json)
    except Exception as e:
        print("Error in age_estim:", str(e))
        raise

def main():
    data_file_path = sys.argv[1]
    with open(data_file_path, 'r') as f:
        data_json = f.read()
    with open("../python/bocal.pkl", "rb") as f:
        cornichons = pickle.load(f)
    age_estim(data_json, cornichons)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise ValueError("Usage: python scriptage.py <data_file_path>")

    main()

