# freezeback
![npm](https://img.shields.io/npm/v/freezeback)
![node](https://img.shields.io/node/v/freezeback)
![types](https://img.shields.io/npm/types/freezeback)
![downloads](https://img.shields.io/npm/dw/freezeback)
![license](https://img.shields.io/npm/l/freezeback)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=mornya_freezeback&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=mornya_freezeback)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=mornya_freezeback&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=mornya_freezeback)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=mornya_freezeback&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=mornya_freezeback)

The project for handling the 'Back button pressed' event.

> This project has been created by [Vessel CLI](https://www.npmjs.com/package/@mornya/vessel).
  For a simple and quick reference about it, click [here](https://mornya.github.io/documents/guide/vessel.md).

## About
프로젝트 개발에 사용되는 모듈들에 대해 집합적인 형태로 제공되는 패키지.

## Installation
해당 라이브러리를 사용 할 프로젝트에서는 아래와 같이 의존성 모듈로 설치한다.
```bash
$ npm install --save freezeback
or
$ yarn add freezeback
```

## Modules in the package
본 패키지에는 아래와 같은 모듈들을 포함한다.
제공되는 모듈과 메소드 사용법 등은 코드 스니핏을 참고한다.

### Freezeback module
Freezeback 모듈은 다음과 같은 메소드들을 제공한다.

#### `Freezeback.initialize`
이벤트 초기화를 실행한다. 애플리케이션 로딩 초기에 한 번 만 실행한다.
```typescript jsx
function initialize(option?: Option): void {}
```

#### `Freezeback.destroy`
이벤트 해제를 실행한다. 애플리케이션 종료시 실행한다.
`needsUnfreeze` 값은 "뒤로가기"를 모두 시도 후 종료한다 (default: true)
```typescript jsx
function destroy(needsUnfreeze: boolean | undefined = true): void {}
```

#### `Freezeback.freeze`
"뒤로가기"가 작동하지 않도록 잠근다.
`key`는 중첩된 잠금 사용시 각각을 구분하기 위한 값으로, 어떤 문자열이 와도 상관없다.
뒤로가기가 눌려지거나 `window.history.back()` 등이 호출되면
파라미터로 주어진 `onBack` 콜백 함수가 실행되며, 뒤로가기 잠금이 해제된다.
```typescript jsx
function freeze(key: string, onBack?: OnBackCallback): void {}
```

#### `Freezeback.unfreeze`
"뒤로가기"를 잠궜을 때 강제로 잠금해제 시킨다.
```typescript jsx
function unfreeze(key: string): void {}
```

#### `Freezeback.isFrozen`
"뒤로가기"가 잠겨있는지 여부를 확인한다.
`key`
```typescript jsx
function isFrozen(key?: string): boolean {}
```

## Installation for development
해당 라이브러리의 개발환경과 빌드/배포 진행 등을 위한 설정으로 아래와 같이 전역 CLI 모듈을 설치한다.
```bash
$ npm install -g @mornya/vessel @lintest/cli sonarqube-scanner
or
$ yarn global add @mornya/vessel @lintest/cli sonarqube-scanner
```

## Available scripts
`package.json`에 정의된 script 항목에 대한 내용은 아래와 같다.

### `clean`
> 빌드 디렉토리 삭제.
```bash
$ npm run clean
```

### `build`
> 컴파일러를 통해 소스코드를 빌드 후 난독화 하여 `dist` 디렉토리에 출력한다.
```bash
$ npm run build
```

### `watch`
> 컴파일러의 watch 모드로 소스코드 변경을 감시하여 컴파일 한다.
```bash
$ npm run watch
```

### `check`
> 타입스크립트 코드 검증을 위해 컴파일러를 실행한다. `lint-stage` 등에서 필요시 사용한다.
```bash
$ npm run check
```

### `lint`
> Lintest CLI를 실행하여 코드 린트 실행.
```bash
$ npm run lint
```

### `lint:fix`
> Lintest CLI를 실행하여 코드 린트 실행 및 자동 교정한다.
```bash
$ npm run lint:fix
```

### `test`
> Lintest CLI를 실행하여 테스트를 수행한다.
```bash
$ npm run test
```

### `test:watch`
> Lintest CLI를 실행하여 watch mode로 테스트를 수행한다.
```bash
$ npm run test:watch
```

### `test:coverage`
> Lintest CLI를 실행하여 테스트 커버리지 데이터를 수집하여 `/coverage` 디렉토리에 출력한다.
```bash
$ npm run test:coverage
```

### `login`
> NPM 레지스트리로의 퍼블리시를 위한 로그인 처리.<br>
 `npm login`에 scope를 선언하여 처리하는 방식과 같다.<br>
 레지스트리 경로는 `package.json`의 publishConfig 항목 값이 참조 된다.
```bash
$ npm run login (not "npm login")
```

### `publish`
> 퍼블리시 수행 전 로그인 / 빌드 / 버전체크 등을 먼저 실행 후 정상완료시 퍼블리시가 수행 된다.
```bash
$ npm publish
```

### `sonar`
소나큐브를 이용한 정적 분석이 필요하면 `sonarqube-scanner`를 글로벌 설치 후 아래 명령을 실행하면 된다. 지표 확인은 `sonar-project.properties` 파일 내 정의 된 URL 및 projectKey를 참조한다.
```bash
$ npm run sonar
```

## Change Log
프로젝트 변경사항은 [CHANGELOG.md](CHANGELOG.md) 파일 참조.

## License
프로젝트 라이센스는 [LICENSE](LICENSE) 파일 참조.

[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-black.svg)](https://sonarcloud.io/summary/new_code?id=mornya_freezeback)
