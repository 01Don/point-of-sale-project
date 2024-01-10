import mysql.connector


class Database:
    def __init__(self) -> None:
        self.conn = mysql.connector.connect(
            host="http://172.233.153.32:8000",
            user="pos1",
            password="pos1234",
            database="point_of_sale",
        )

    def __enter__(self):
        self.cursor = self.conn.cursor(dictionary=True)
        return self.cursor

    def __exit__(self, exc_type, exc_value, exc_traceback) -> None:
        if exc_type:
            # An exception occurred, rollback the transaction
            self.conn.rollback()
        else:
            # No exception, commit the transaction
            self.conn.commit()

        # Close the cursor
        self.cursor.close()

        # Clear any remaining unread results
        while self.conn.unread_result:
            self.conn.get_records()

        # Close the connection
        self.conn.close()
