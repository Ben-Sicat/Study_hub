        connection.close()

# User-related functions
def write_to_users(data):
    connection = get_db_connection(db_config)
    if connection:
        try: