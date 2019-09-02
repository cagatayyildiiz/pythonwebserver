import cursor as cursor
import requests
import sqlite3
import pandas as pd
import tornado.ioloop
import tornado.web
import urllib
import datetime
from tornado import httpclient
BOOLA=True
import os
class Controller:
    def controling(fonKodu,sqlconnect):
        connectionstr="C:\\Users\\Çağatay Yıldız\\Desktop\\New folder\\PortfoyDegerleri{0}".format(sqlconnect)
        conn = sqlite3.connect(connectionstr)
        # df.to_sql(name='PortfoyDegerleri3',con=conn)
        sqlquery = 'select * from PortfoyDegerleri WHERE FonKodu="%s"'%(fonKodu)
        df = pd.DataFrame(pd.read_sql(sqlquery, conn))
        post_data = (
                df[["Tarih", "BirimPayDegeri"]]
                    .to_dict(orient="records")
            )  # A dictionary of your post data
        return post_data


    def OptionController(sqlconnect):
        connectionstr="C:\\Users\\Çağatay Yıldız\\Desktop\\New folder\\PortfoyDegerleri{0}".format(sqlconnect)
        conn = sqlite3.connect('C:\\Users\\Çağatay Yıldız\\Desktop\\New folder\\PortfoyDegerleri3')
        df = pd.DataFrame(pd.read_sql("SELECT DISTINCT FonKodu,FonUnvani FROM PortfoyDegerleri", conn))
        selected_data = (
                df[["FonKodu", "FonUnvani"]]
                    .to_dict(orient="records")
            )  # A dictionary of your post data
        dictA={}
        for key in selected_data:
            key = str(key).replace("'", "")
            a = ((key.split(","))[0].split(":"))[1].replace(" ", "")
            b = ((key.split(","))[1].split(":")[1]).replace("}","")
            dictA[a] = b
        return dictA

class Main(tornado.web.RequestHandler):

    def get(self):
        vara = self.get_cookie("mycookie")
        self.render("new2.html",title='TTT',dict=Controller.OptionController(vara))
class DataHandler(tornado.web.RequestHandler):
    def post(self):
        variable=self.get_argument("option")
        vara = self.get_cookie("mycookie")
        self.write({"pay": Controller.controling(variable,vara)})

def make_app():
    return tornado.web.Application([
        (r"/data", DataHandler),
        (r"/",Main),
    ])
if __name__ == "__main__":
    app = make_app()
    app.listen(8889)
    tornado.ioloop.IOLoop.current().start()
