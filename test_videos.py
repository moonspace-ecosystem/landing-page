import urllib.request

urls = [
"https://framerusercontent.com/assets/0CUUR6nQ0ZogcJ2lGrL4jTeyL0.mp4",
"https://framerusercontent.com/assets/EooRZxYimeMIcAiwoxeuGPdB4fU.mp4",
"https://framerusercontent.com/assets/GyERl2Y0foenhkss9Ee38fF2DXQ.mp4",
"https://framerusercontent.com/assets/u5MJkI1zriMKPcDEL05E4hMhXzQ.mp4",
"https://framerusercontent.com/assets/vyG59GtAkkRk9JVVfePepatRB8.mp4",
"https://framerusercontent.com/assets/YRDOUWVSLIPgcSy311jehgd87Y.mp4"
]

for url in urls:
    try:
        response = urllib.request.urlopen(url)
        print(f"{url}: {response.headers.get('Content-Length')} bytes")
    except Exception as e:
        print(f"{url}: {e}")
