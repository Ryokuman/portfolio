# Portfolio Agent Guide

## Resume Framing Policy

이 포트폴리오/이력서는 보수적인 증빙 문서가 아니라 채용 설득 문서다.

- 면접관은 일반적으로 전체 소스코드나 git log를 볼 수 없으므로, 문서에서는 상세 증명보다 문제-해결 서사를 우선한다.
- 단순 기여 축소 표현을 피하고, 본인이 설명 가능한 구조/시스템/전환 작업은 적극적으로 `설계`, `구축`, `전환`, `시스템화`로 표현한다.
- 기술 스택 나열보다 `어떤 반복 병목이 있었고, 어떤 시스템으로 바꿔 개발 속도를 올렸는가`를 우선한다.
- 수치와 성과는 이력서에서 먼저 강하게 제시하고, 산식/역할 경계/꼬리질문 답변은 별도 interview-prep 문서에서 관리한다.
- 외부에서 쉽게 반박 가능한 허위 사실은 쓰지 않되, 프로젝트 내부 맥락과 본인이 설명 가능한 범위에서는 공격적으로 포지셔닝한다.

## Resume Writing Direction

핵심 페르소나는 `개발 속도를 막는 반복 병목을 구조화하고, 시스템으로 만들어 해결하는 개발자`다.

이력서와 포트폴리오 문안은 다음 흐름으로 작성한다.

1. 어떤 반복 병목이 있었는가
2. 왜 기존 방식으로는 개발 속도가 나지 않았는가
3. 어떤 구조나 시스템으로 전환했는가
4. 그 결과 개발 속도, QA 속도, 제품 구현 범위가 어떻게 좋아졌는가

표현은 보수적으로 낮추지 않는다. 가능한 한 다음 동사를 우선 사용한다.

- `설계했다`
- `구축했다`
- `전환했다`
- `시스템화했다`
- `표준화했다`
- `자동화했다`
- `병목을 줄였다`
- `개발 속도를 높였다`

기본 기술 역량은 길게 쓰지 않는다. React, TypeScript, Next.js 같은 기본 스택은 필요할 때만 문장 안에 자연스럽게 포함하고, 별도 공간을 많이 쓰지 않는다.

## Variant Positioning

프론트엔드 버전:

- 핵심 메시지: `반복되는 화면 개발 병목을 프레임워크, 생성기, 검증 시스템으로 전환해 개발 속도를 높인 개발자`
- DynaMOS v2, dynamos-snapshot, dynavite, Worktree System을 우선 배치한다.
- 화면 구조, 상태관리, config 기반 조립, core component, generated page QA를 강조한다.

백엔드 버전:

- 핵심 메시지: `반복되는 API, 데이터 처리, LLM 통합 병목을 구조화하고 자동화 시스템으로 전환한 개발자`
- CGV-ASSISTANT, LLAMI LLM Worker, dynamosconvert/snapshot의 API contract 분석을 우선 배치한다.
- 메모리 안정화, 캐싱 구조, API 병렬화, LLM API pipe, backend method/query contract를 강조한다.

풀스택 버전:

- 핵심 메시지: `화면, API, QA, 개발 프로세스의 병목을 구조화하고 시스템으로 전환해 제품 개발 속도를 높인 개발자`
- DynaMOS Platform, CGV-ASSISTANT, LLAMI, Worktree System을 우선 배치한다.
- 제품 구현 범위와 개발 시스템 개선을 함께 보여준다.

## Project Framing Rules

### DynaMOS Platform

DynaMOS는 단일 `dynamos-v2` 프로젝트가 아니라 다음 생태계로 묶어 작성한다.

- `dynamos-v2`: Store + Context 기반 ERP/MES frontend framework
- `dynamos-snapshot`: V1 snapshot data를 V2 `index.tsx`, `config.ts`로 생성하는 converter/renderer pipeline
- `dynavite`: generated page를 사일로 내부에서 빠르게 검증하는 Vite runtime harness
- `dynamosconvert`: Spring Boot/MyBatis 기반 backend endpoint/method/query contract 분석 근거
- `Claude Worktree System`: QA 병렬 처리와 branch/server/terminal/plan 운영 시스템

핵심 문제는 `100개+ 업무 화면을 빠르게 만들어야 했지만, 화면마다 상태관리/필터/그리드/버튼 구조가 달라 개발 속도와 품질이 흔들리던 문제`로 잡는다.

### dynamos-snapshot

핵심 문제는 `V1 화면 정보를 사람이 읽고 V2 index.tsx/config.ts로 옮기는 작업이 반복적이고, HTML/JS/widgetprop/elements 데이터가 흩어져 수동 복원 비용이 컸던 문제`로 잡는다.

문안에서는 `AI가 직접 코드를 쓰게 하기보다 V1 데이터를 정해진 규칙으로 변환하는 생성 시스템을 만들었다`는 방향을 사용한다.

### dynavite

dynavite는 일반 개발 도구가 아니라 `개발 에이전트 사일로 내부 QA 전용 runtime`으로 설명한다.

사일로는 `특정 task/issue를 맡은 AI + 격리 프로젝트 실행 환경 단위`로 정의한다. 각 사일로는 보호 브랜치를 직접 더럽히지 않고, 필요한 repo를 격리 clone/branch로 다루며, 결과를 PR과 검증 기록으로 메인 오케스트레이터에 돌려준다.

핵심 문제는 `generated page 하나를 확인하려고 전체 Next 앱, 인증 흐름, 세션, backend API 의존성을 모두 띄워야 해 사일로 내부 QA 루프가 느렸던 문제`로 잡는다.

문안에서는 `mock API`, `mock auth`, `session/header/localStorage 주입`, `single page harness`, `Agent Browser가 특정 page id의 filter/grid/button surface를 빠르게 확인할 수 있는 구조`를 강조한다.

### Claude Worktree System

핵심 문제는 `QA 기간 여러 branch를 동시에 처리해야 했지만, branch 전환마다 server 재시작, 의존성 설치, 작업 맥락 복구가 반복되던 문제`로 잡는다.

추가로 `worktree를 옮길 때 사람과 AI가 작업 컨텍스트를 잃는 문제`를 포함한다.

문안에서는 branch별 dev server, web terminal, plan, health check, PTY source of truth, plan 양방향 동기화를 강조한다.

### POUL Projects

POUL 프로젝트는 시스템 개선보다 `프론트엔드, 백엔드, 앱을 넘나든 0->1 제품 구현 경험`으로 작성한다.

CGV-ASSISTANT는 백엔드/풀스택 버전에서만 메모리 안정화, 캐싱 테이블, API 병렬화 같은 문제 해결을 강하게 쓴다.

LLAMI는 모델스토어, 봇스토어, 라미챗, Expo 앱까지 여러 product surface를 끝까지 구현한 경험으로 쓴다.

### agent-hive

agent-hive는 실제 운영 성과가 약하므로 메인 성과로 과장하지 않는다. 필요한 경우 `AI agent workflow 실험` 또는 `상용화된 skill/prompt/workflow 묶음` 정도로만 다룬다.

### Orchestrator / SSoT

vaultcraft보다 최신 방향은 `main orchestrator + silo system + SSoT`로 표현한다.

핵심 문제는 `여러 사일로가 병렬로 움직이면 전체 issue/task/PR/QA/user feedback을 통합 판단할 중심 시스템이 필요했던 문제`로 잡는다.

단독 대표 프로젝트보다는 Worktree/DynaMOS 자동화 서사의 운영 철학 또는 보조 프로젝트로 사용한다.
