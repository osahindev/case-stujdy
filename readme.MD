# Ödev

Basit bir envanter yönetim uygulaması.

Front-end: Vite + React JS

Back-end: Python + Flask + SQL Alchemy

## Proje demo önizleme

<a href="https://drive.google.com/file/d/1nMSIVRXkgMY9ja0GPOdYV4SfqdE6wvjJ/preview" title="Link Title"><img src="https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihb1MCkZZEmkMGc4iq6igz99YxuOnun9MEdryPsiON6sq1NVwiq0u-x6s4_OoscDiSuSnsERxz_IHmjoKqEyTXMImXZLH6s7sE4=w1920-h1080-k-rw-v1-pd" alt="Alternate Text" /></a>

## Projeyi Docker ile ayağa kaldırma

```bash
docker-compose up -d
```

Docker servisleri ayağa kalkacak ve projeye `http://localhost` üzerinden ulaşabileceksiniz.

## Tailwind watch

Eğer stiller üzerinde değişiklik yapmak istiyorsanız. Aşağıdaki komutu frontend içerisinde çalıştırın.

```bash
npx tailwindcss -i ./src/styles/main.css -o ./src/styles/style.css --watch
```

### Docker üzerinde

Aktif docker konteyner listesini almak için.

```bash
docker ps
```

Konteyner içinde çalıştırmak için **DOCKERID** yazan kısma frontend konteynırın kimliğini giriniz.

```bash
docker exec -it DOCKERID npx tailwindcss -i ./src/styles/main.css -o ./src/styles/style.css --watch
```

~~~
Windows üzerinde docker ile ayağa kaldıracaksanız. WSL2 ile ubuntu üzerinden ayağa kaldırmanızı tavsiye ediyorum. Aksi taktirde dosyaları WSL'e bağlarken dosya sistemi farklılıklarından dolayı performans kaybı yaşabilirsiniz.
~~~

## Docker olmadan ayağa kaldırma

Bu repoyu klonlayınız.

```bash
git clone https://github.com/osahindev/case-study.git
```

### Backend için:

Gereksinimler:

* Python 3

Backend klasörü içerisinde bir virtual enviroment oluşturun.

```python
python -m venv venv
```

Ardından bu sanal ortamı aktif edin.

Windows için

```bash
"venv/Scripts/activate"
```

Linux için

```bash
source venv/bin/activate
```

Ardından paketleri kurmak için 

```bash
pip install -r requirements.txt
```

Paketler kurulduktan sonra aşağıdaki kod ile flask servisini ayağa kaldırın.

```bash
flask --app flaskapp run 
```

Bu kodun ardından flask *http://127.0.0.1:5000* adresinden ayağa kalkacaktır.

## Frontend için:

Gereksinimler:

* NodeJS 18

Paketleri yüklemek için

```bash
npm install
```

komutunu çalıştırın. Backend servisiyle bağlantı kurması için **src/main.tsx** dosyasında aşağıda bulunan kodu düzenleyin. Burada bulunan baseURL değerini ayağa kaldırdığınız backend servisine göre düzenleyiniz. 

```javascript
axios.defaults.baseURL = "http://localhost:5001/api/";
```

Bu ayarlamaları yaptıktan sonra frontend servisini ayağa kaldırmaya hazırsınız demektir.

```bash
npm run dev
```

Bu komut ile frontend servisini ayağa kaldırmış olacaksınız.

http://localhost:3000/ adresinden frontend servisine ulaşabilirsiniz.


## Kullanıcı girişi

Varsayılan olarak uygulama çalıştırıldığında bir kullanıcı hesabı oluşturulmaktadır. Bu hesap ile uygulamada oturum açabilirsiniz.

* E-Posta: osahin@outlook.com
* Şifre: 123456
