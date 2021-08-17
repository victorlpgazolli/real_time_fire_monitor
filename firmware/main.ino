#include "DHT.h"
#include <LoRaWAN.h>
#include <SoftwareSerial.h>
#include <stdint.h>
SoftwareSerial *hSerialCommands = NULL;

char APPKEY[] = "YOUR_APP_KEY_HERE";
char APPEUI[] = "YOUR_APP_EUI_HERE";
char CHMASK[] = "YOUR_CHMASK_HERE";
char str_counter[32];

const int pinoDHT = 5;
int sensorCO2;

int answer = 0;
DHT dht(pinoDHT, DHT11);

void setup()
{
  Serial.begin(9600);
  Serial.println(F("TESTANDO QUALQUER COISA"));
  delay(2000);

  /* Initialize SoftwareSerial */
  hSerialCommands = SerialCommandsInit(3, 1, 9600);

  /* Configure the EndDevice as OTAA */
  InitializeOTAA(APPKEY, APPEUI);
  SendAtCommand(AT_CHMASK, AtSet, CHMASK);

  delay(3000);

  Serial.println("AT+CLASS=C");
  delay(3000);
  Serial.print("Configurando join 1 delay: ");
  Serial.println("AT+JN1DL=5000");
  delay(3000);
  Serial.print("Configurando join 2 delay : ");
  Serial.println("AT+JN2DL=6000");
  delay(3000);

  dht.begin();

  if (JoinNetwork(0) == RAD_OK)
  {
    Serial.println("SDBSADYSAVDYUS EndDevice has joined sucessfully.");
  }
  else
  {
    Serial.println("Error joining the network.");
  }
}

void loop()
{
  //ConnectGateway();

  float h = dht.readHumidity();
  float t = dht.readTemperature();

  // Verificando se está lendo dados de umidade e temperatura
  if (isnan(h) || isnan(t))
  {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }
  //
  // Calculando o índice de aquecimento em Celsius (isFahreheit = false)
  float hic = dht.computeHeatIndex(t, h, false);

  // Captando os dados de umidade e temperatura
  Serial.print(F("Humidity: "));
  Serial.print(h);
  Serial.print(F("%  Temperature: "));
  Serial.print(t);
  Serial.print(F("°C "));

  //Captando os dados de CO2
  sensorCO2 = analogRead(0);

  delay(2000);
  sprintf(str_counter, "%f,%f,%f\r\n\0", h, t, sensorCO2);
  Serial.println(str_counter);
  SendString(str_counter, 2);
  delay(5000);
}