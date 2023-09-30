import numpy as np
import pandas as pd

#school
school_choices = ['ust', 'adu', 'feu', 'tip', 'anon']
school_weights = [0.40, 0.05, 0.35, 0.10, 0.10] 

#gender
gender_choices = ['M', 'F']
gender_weights = [0.50, 0.50]

#age
age_choices = ['20-25', '15-20', '25-30', '40-above']
age_weights = [0.30, 0.15, 0.30, 0.25]

# Number of rows  
num_rows = 1000   

# datasets
school_data = np.random.choice(school_choices, size=num_rows, p=school_weights)
gender_data = np.random.choice(gender_choices, size=num_rows, p=gender_weights)
age_data = np.random.choice(age_choices, size=num_rows, p=age_weights)

#dataframe
data = pd.DataFrame({
    'Schools': school_data,
    'Gender': gender_data,
    'Age': age_data
})

 
print(data.describe())

 
data.to_csv('generated_dataset.csv', index=False)

print("Dataset saved as 'generated_dataset.csv'.")
