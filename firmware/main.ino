#include "DHT.h"
#include <LoRaWAN.h>
#include <SoftwareSerial.h>
#include <stdint.h>
SoftwareSerial* hSerialCommands = NULL;

char APPKEY[] = "67:32:A8:76:05:E7:23:CC:39:65:E9:60:ED:BE:65:0A";
char APPEUI[] = "70:B3:D5:7E:D0:03:EA:66";
char CHMASK[] = "FF00:0000:0000:0000:0001:0000";
char str_counter[32];

const int pinoDHT = 5;
int sensorCO2; 
 
int answer = 0;
DHT dht(pinoDHT, DHT11);

void setup() {
Serial.begin(9600);
Serial.println(F("TESTANDO QUALQUER COISA"));
delay(2000);

/* Initialize SoftwareSerial */
hSerialCommands = SerialCommandsInit(3, 1, 9600);

/* Configure the EndDevice as OTAA */
InitializeOTAA(APPKEY, APPEUI);
SendAtCommand(AT_CHMASK, AtSet, CHMASK);

delay(3000);
//  Serial.println("Sending JOIN.");
Serial.println("AT+CLASS=C");
delay(3000);
Serial.print("Configurando join 1 delay: ");
Serial.println("AT+JN1DL=5000");
delay(3000);
Serial.print("Configurando join 2 delay : ");
Serial.println("AT+JN2DL=6000");
delay(3000);

dht.begin(); 
//Iniciando o LoRaWan
//Set_APPEUI();
//Set_APPKEY();
//Set_OTAA();
//Set_MASK();
//Set_CLASS();
//Set_DELAYS();
if(JoinNetwork(0) == RAD_OK)
{
  Serial.println("SDBSADYSAVDYUS EndDevice has joined sucessfully.");
}
else
{
  Serial.println("Error joining the network.");
}
}

void loop() {
//ConnectGateway();

float h= dht.readHumidity();
float t = dht.readTemperature();

// Verificando se está lendo dados de umidade e temperatura
 if (isnan(h)  || isnan(t)) {
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
      
//Serial.print("CO2=");
//Serial.print(sensorCO2, DEC);               
//Serial.println(" PPM");

//Serial.println("AT+SEND=5:"+sensorCO2);
delay(2000);
 sprintf(str_counter, "%f,%f,%f\r\n\0", h, t, sensorCO2);
Serial.println(str_counter);
SendString(str_counter, 2);
delay(5000);

/*
  while (Serial.available() > 0) {
     Serial.println(Serial.read());  
delay(3000);
}
*/
} 
/*
void Set_APPEUI(){
Serial.print("Configurando: ");
Serial.println("AT+APPEUI=70B3D57ED003EA66");
}

void Set_APPKEY(){
Serial.print("Configurando: ");
Serial.println("AT+APPKEY=6732A87605E723CC3965E960EDBE650A");
}

void Set_MASK(){
Serial.print("Configurando: ");
Serial.println("AT+CHMASK=FF00:0000:0000:0000:0001:0000");
}

void Set_OTAA(){
Serial.print("Configurando: ");
Serial.println("AT+NJM=1");
}

void Set_CLASS(){
Serial.print("Configurando: ");
Serial.println("AT+CLASS=C");
}

void Set_DELAYS(){
Serial.print("Configurando join 1 delay: ");
Serial.println("AT+JN1DL=5000");
Serial.print("Configurando join 2 delay : ");
Serial.println("AT+JN2DL=6000");
}

void ConnectGateway() {
Serial.println("AT+JOIN");
LoraAnswer();
delay(2000);
}

// FALTA FAZER O TEMPO DE SINCRONIZAÇÃO

void LoraAnswer(){
  while (Serial.available() > 0) {
     answer = Serial.read();  
     Serial.println(answer);
} 
}

//}
/*Respostas ( ASCII para DEC)
 * 
 * AT_OK =  65 84 95 79 75
 * AT_ERROR = 65 84 95 69 82 82 79 82
 * AT_JOIN_OK = 65 84 95 74 79 73 78 95 79 75
 * AT_JOIN_ERROR = 65 84 95 74 79 73 78 95 69 82 82 79 82
 * 
 * 
 * 
 * 
 */

/* Dicas
 *  Podemos usar o SENDB para enviar dados hexadecimais 
 * 
 * 
*/
