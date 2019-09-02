import requests
import sqlite3
import pandas as pd
import datetime
import os


def func(interval):
    now=datetime.date.today()
    intervalint=int(interval)
    needed=datetime.date.today() - datetime.timedelta(intervalint*365/12)
    requeststr="https://ws.spk.gov.tr/PortfolioValues/api/PortfoyDegerleri/1/%s/%s"%(needed,now)
    req = requests.get(requeststr)
    sqlquery="C:\\Users\\Çağatay Yıldız\\Desktop\\New folder\\PortfoyDegerleri{0}".format(interval)
    if os.path.exists(sqlquery):
        os.remove(sqlquery)
    conn = sqlite3.connect(sqlquery)
    df = pd.DataFrame(req.json())
    df.to_sql(name='PortfoyDegerleri',con=conn)
func(1)
func(3)
func(6)
func(12)
func(36)


