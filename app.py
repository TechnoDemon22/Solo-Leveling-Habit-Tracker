from flask import Flask, render_template, send_from_directory
import webbrowser
from threading import Timer
import os

app = Flask(__name__, template_folder='app', static_folder='app')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/style.css')
def serve_style():
    return send_from_directory('app', 'style.css')

@app.route('/style-2.css')
def serve_style2():
    return send_from_directory('app', 'style-2.css')

@app.route('/app.js')
def serve_app_js():
    return send_from_directory('app', 'app.js')

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('app', filename)

def open_browser():
    webbrowser.open('http://127.0.0.1:5000')

if __name__ == '__main__':
    timer = Timer(1, open_browser)
    timer.daemon = True
    timer.start()
    app.run(debug=False, use_reloader=False, port=5000)