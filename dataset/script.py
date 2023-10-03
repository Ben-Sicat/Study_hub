import numpy as np
import pandas as pd
import random
from faker import Faker
import datetime

# Create a Faker instance to generate user names
fake = Faker()

#school
school_choices = ['UST', 'AdU', 'FEU', 'TIP', 'OTHER']
school_weights = [0.4, 0.1, 0.1, 0.1, 0.3]  # Adjusted weights

#employment
employment_choices = ['BPO', 'teacher', 'software engineer', 'influencer', 'management', 'doctor', 'nurse', 'lawyer']
employment_weights = [0.4, 0.1, 0.1, 0.1, 0.1, 0.05, 0.05, 0.1]

#gender
gender_choices = ['M', 'F']
gender_weights = [0.50, 0.50]

#age
# age_choices = ['20-25', '15-20', '25-30', '40-above']
# age_weights = [0.30, 0.15, 0.30, 0.25]

#rows
num_rows = 1000

# birthday
birthday = [fake.date_of_birth() for _ in range(num_rows)]

#user IDs
user_ids = [random.randint(1000, 9999) for _ in range(num_rows)]
first_names = [fake.first_name() for _ in range(num_rows)]
last_names = [fake.last_name() for _ in range(num_rows)]

# timestamps
durations = [random.choices([60, 90, 120, 180, 240, 300, 360], weights=[9, 15, 15, 20, 20, 15, 6])[0] for _ in range(num_rows)]
start_times = [fake.date_time_between(start_date='-1d', end_date='now') for _ in range(num_rows)]
end_times = [start_time + datetime.timedelta(minutes=dur) for start_time, dur in zip(start_times, durations)]

# Generate extension durations
extension_durations = []
for duration in durations:
    extension_probabilities = [0.3 / (i + 1) for i in range(duration // 30)]
    extension_duration = random.choices(range(1, duration // 30 + 1), weights=extension_probabilities, k=1)
    extension_durations.append(extension_duration[0] * 30)

# null values
null_chance = 0.05  # 5% chance for null values
for i in range(num_rows):
    if random.random() < null_chance:
        user_ids[i] = None
        first_names[i] = None
        last_names[i] = None
        extension_durations[i] = None

# employment is school or job
employment_data = np.random.choice(['school', 'job'], size=num_rows, p=[0.6, 0.4])

#category (school or job)
employment_list = []
for category in employment_data:
    if category == 'school':
        employment = np.random.choice(school_choices, p=school_weights)
        employment_list.append(employment)
    else:
        employment = np.random.choice(employment_choices, p=employment_weights)
        employment_list.append(employment)

birthdays = []
for category in employment_data:
    if category == 'school':
        # Generate a birthday between 15 to 24 years old
        birthday = fake.date_of_birth(minimum_age=15, maximum_age=24)
    else:
        # Generate a birthday between 25 to 50 years old
        birthday = fake.date_of_birth(minimum_age=25, maximum_age=50)
    birthdays.append(birthday)

# Create a DataFrame
data = pd.DataFrame({
    'User ID': user_ids,
    'First Name': first_names,
    'Last Name': last_names,
    'Employment': employment_list,
    'Gender': np.random.choice(gender_choices, size=num_rows, p=gender_weights),
    'Birthday': birthdays,
    'Time In': start_times,
    'Time Out': end_times,
    'Extension Duration': extension_durations
})

print(data.describe())

data.to_csv('generated_dataset.csv', index=False)

print("Dataset saved as 'generated_dataset.csv'.")
