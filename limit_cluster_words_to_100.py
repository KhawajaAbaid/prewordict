# i completely forgot to check the number of words in the cluster files
# and it contains 100K plus words.
# that's insane and inefficient.
# We are going to limit the words to top 100 words.

from typing import overload
import pandas as pd
import glob

csv_files = glob.glob('clouds_and_words\\*.csv')

for csv_file in csv_files:
    df = pd.read_csv(csv_file)[:100]
    df_words = df["Words"]
    df_words.to_csv(csv_file, index=False)