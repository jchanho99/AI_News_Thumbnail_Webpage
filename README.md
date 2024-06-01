# AI News Thumbnail Webpage - Crawling

## 프로젝트 개요
이 프로젝트는 AI 기술을 활용하여 뉴스 헤드라인과 링크를 스크래핑하고, 뉴스 기사의 원문을 요약하여 사용자에게 제공합니다. AWS 서버리스 환경을 이용하여 자동화된 시스템을 구축합니다.

## 주요 기능
1. **뉴스 헤드라인 및 링크 스크래핑**
   - 뉴스 사이트에서 최신 헤드라인과 링크를 스크래핑합니다.
2. **뉴스 기사 원문 가져오기**
   - 스크래핑한 링크를 따라가 trafilatura를 사용하여 뉴스 기사 원문을 가져옵니다.
3. **기사 요약 생성**
   - 가져온 뉴스 기사를 OpenAI API를 활용하여 요약합니다.
4. **데이터 저장**
   - 요약된 뉴스를 JSON 형태로 Firebase에 저장합니다.

## 기술 스택
- **스크래핑**: BeautifulSoup, Requests
- **기사 원문 추출**: Trafliatura
- **요약 생성**: OpenAI API
- **데이터베이스**: Firebase
- **클라우드 환경**: AWS Lambda, AWS API Gateway
- **언어**: Python

## 설치 및 설정 방법
### 사전 요구사항
- AWS 계정
- Firebase 프로젝트
- OpenAI API 키

### 환경 설정
1. **AWS 설정**
   - AWS Lambda와 API Gateway를 설정합니다.
   - AWS CLI를 설치하고 구성합니다.

2. **Firebase 설정**
   - Firebase 프로젝트를 생성하고, 실시간 데이터베이스를 설정합니다.
   - Firebase Admin SDK를 설정하고, 서비스 계정 키 파일을 다운로드합니다.

3. **OpenAI API 설정**
   - OpenAI API 키를 발급받습니다.

### 코드 설치
1. **레포지토리 클론**
   ```bash
   git clone https://github.com/yourusername/AI_News_Thumbnail_Webpage.git
   cd AI_News_Thumbnail_Webpage
