
#include <Wire.h>
#include <SoftwareSerial.h>
#include <math.h>
#include <Adafruit_MLX90614.h>
// Define the data transmit/receive pins in Arduino

//#define TxD 2
//#define RxD 3

//SoftwareSerial mySerial(RxD, TxD); // RX, TX for Bluetooth
SoftwareSerial mySerial(3, 2); // RX, TX for Bluetooth

SoftwareSerial scanner(4, 5); // RX, TX for Barcode SCanner
const int buttonPin = 9;     // the number of the pushbutton pin
const int ledPin =  8;  
Adafruit_MLX90614 mlx = Adafruit_MLX90614();


void setup() {
  pinMode(buttonPin, INPUT);
  pinMode(ledPin, OUTPUT);
  pinMode(7,OUTPUT);
mySerial.begin(9600); // For Bluetooth
scanner.begin(9600);
Serial.begin(9600);
Serial.print("ABC");
mlx.begin();
//Serial.begin(9600); // For the IDE monitor Tools -> Serial Monitor
//Serial.write("Barcode scanner start");
// Any code that you want to run once....
mySerial.println( "bluetooth connected" );
mySerial.println( "Scanner connected" );
Serial.println( "bluetooth connected" );
Serial.println( "Scanner connected" );
}

void loop() {
    int counter = 0;
    char myarr[20];
    String xxx;
////    scanner.write("");
//
//scanner.print(128,HEX);
//scanner.print(0,DEC);

//scanner.write(0x08);
//
//scanner.write(0x01);

//scanner.write(static_cast(0x00));

//scanner.write(0x02);
//
//scanner.write(0x01);
//
//scanner.write(0xAB);
//
//scanner.write(0xCD);
//    digitalWrite(7,HIGH);
    while(!scanner.available());
    while((scanner.available() > 0)){
         delay(10); 
      char data_rcvd = (char) scanner.read();
      Serial.write(data_rcvd);
      myarr[counter] = data_rcvd;
      counter++;

    }
    // WAITS FOR BUTTON TO TAKE TEMPERATURE
    digitalWrite(ledPin, HIGH);
    while(digitalRead(buttonPin) != HIGH);
    
//    mySerial.print("NICE");
//    delay(2000);
    //char to string has issues
    xxx = String(myarr);
//    delay(100);  
    Serial.println(xxx);
    mySerial.println(xxx);

    delay(1000);
    
//    delay(100);
//    mySerial.print("*C\tObject = "); 


//============ REAL TEMPERATURE ===================================
//Flash if temperature is above 37.5
//
//float temp = mlx.readObjectTempC();
//if ((temp > 37.5) || isnan(temp)){
//flash();
//}
//
////    mySerial.print("Ambient = "); mySerial.print(mlx.readAmbientTempC());
//mySerial.print("Object= ");mySerial.println(temp);
//

//======== END OF REAL TEMPERATURE ===========================



// ================== DUMMY TEMPERATURE ================================
 mySerial.print("Object="); mySerial.println("37.5");

// ================== END OF DUMMY TEMPERATURE =======================

 
//    mySerial.println("*C");
    delay(100);
    mySerial.println("done");

      //off light
    digitalWrite(ledPin, LOW);
    
}

void flash(){
  digitalWrite(ledPin, LOW);
  delay(100);
  digitalWrite(ledPin, HIGH);
  delay(300);
  digitalWrite(ledPin, LOW);
  delay(100);
  digitalWrite(ledPin, HIGH);
  delay(300);
  digitalWrite(ledPin,LOW);
  delay(100); 
  digitalWrite(ledPin, HIGH);
  delay(300);
  digitalWrite(ledPin, LOW);
  delay(100);
  digitalWrite(ledPin, HIGH);
  delay(300);
  digitalWrite(ledPin,LOW); 
  
}
