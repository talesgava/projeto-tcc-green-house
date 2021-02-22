#include <ThingerESP32.h>
#include "DHTesp.h"
#define USERNAME "SEUUSUARIOTHINGER"
#define DEVICE_ID "DEVICEID"
#define DEVICE_CREDENTIAL "DEVICESENHA"
#define SSID "SEUWIFI"
#define SSID_PASSWORD "WIFIPASSWORD"

ThingerESP32 thing(USERNAME, DEVICE_ID, DEVICE_CREDENTIAL);

DHTesp dht;

long previousMillis = 0;
long interval = 1000;
int valor_analogico = 0;
int dht_Pin = 13;
String temperatura;
String umidade;

void setup()
{
  thing.add_wifi(SSID, SSID_PASSWORD);
  dht.setup(dht_Pin, DHTesp::DHT22);
  thing["luminosity"] >> [](pson & out) {
    out = map(analogRead (34), 4095, 0, 0, 100);
  };
  thing["temperature"] >> [](pson & out) {
    out = dht22("temperatura");
  };
  thing["humidity"] >> [](pson & out) {
    out = dht22("umidade");
  };
  thing["soil"] >> [](pson& out){ 
    out = map(analogRead (35), 4095, 0, 0, 100); 
    };
}

void loop()
{
  thing.handle();
  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis > interval) {
    previousMillis = currentMillis;
    thing.stream(thing["temperature"]);
    thing.stream(thing["luminosity"]);
    thing.stream(thing["humidity"]);
    thing.stream(thing["soil"]);
  };
}

String dht22(String a)
{
  TempAndHumidity sensorDht = dht.getTempAndHumidity();
  temperatura = String(sensorDht.temperature,0);
  umidade = String(sensorDht.humidity,0);

  if (a == "temperatura"){
    return temperatura;
  }
  else if (a == "umidade"){
    return umidade;
  }
} 
