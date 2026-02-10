# ==========================================
# PROJECT 2: Custom Customer Interaction Log
# ==========================================
# Usage: Run 'python mini_crm.py' then go to http://127.0.0.1:5000

from flask import Flask, request, render_template_string, redirect, url_for
import sqlite3
import datetime

app = Flask(__name__)

# Database Setup
def init_db():
    conn = sqlite3.connect('crm.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS logs 
                 (id INTEGER PRIMARY KEY, customer TEXT, inquiry TEXT, 
                  response TEXT, status TEXT, date TEXT)''')
    conn.commit()
    conn.close()

# HTML Template (Inline for single-file speed)
HTML_TEMPLATE = """
<!doctype html>
<html>
<head>
    <title>VA CRM Log</title>
    <style>
        body { font-family: sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; }
        input, textarea, select { width: 100%; padding: 10px; margin: 5px 0; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .btn { background: #007bff; color: white; padding: 10px 20px; border: none; cursor: pointer; }
    </style>
</head>
<body>
    <h1>📝 Customer Interaction Log</h1>
    
    <div style="background: #f9f9f9; padding: 20px; border-radius: 8px;">
        <h3>Log New Interaction</h3>
        <form method="POST" action="/add">
            <input type="text" name="customer" placeholder="Customer Name" required>
            <textarea name="inquiry" placeholder="Customer Inquiry" required></textarea>
            <textarea name="response" placeholder="Draft Response"></textarea>
            <select name="status">
                <option value="Pending">Pending</option>
                <option value="Responded">Responded</option>
                <option value="Closed">Closed</option>
            </select>
            <button type="submit" class="btn">Log Interaction</button>
        </form>
    </div>

    <h3>History</h3>
    <table>
        <tr>
            <th>Date</th><th>Customer</th><th>Inquiry</th><th>Status</th>
        </tr>
        {% for row in rows %}
        <tr>
            <td>{{ row[5] }}</td>
            <td>{{ row[1] }}</td>
            <td>{{ row[2] }}</td>
            <td>{{ row[4] }}</td>
        </tr>
        {% endfor %}
    </table>
</body>
</html>
"""

@app.route('/')
def index():
    conn = sqlite3.connect('crm.db')
    c = conn.cursor()
    c.execute("SELECT * FROM logs ORDER BY id DESC")
    rows = c.fetchall()
    conn.close()
    return render_template_string(HTML_TEMPLATE, rows=rows)

@app.route('/add', methods=['POST'])
def add_entry():
    customer = request.form['customer']
    inquiry = request.form['inquiry']
    response = request.form['response']
    status = request.form['status']
    date = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
    
    # Simulate Email Sending (Project Requirement)
    print(f"--- MOCK EMAIL SENT TO {customer} ---")
    print(f"Body: {response}")
    
    conn = sqlite3.connect('crm.db')
    c = conn.cursor()
    c.execute("INSERT INTO logs (customer, inquiry, response, status, date) VALUES (?, ?, ?, ?, ?)",
              (customer, inquiry, response, status, date))
    conn.commit()
    conn.close()
    return redirect(url_for('index'))

if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=5000)