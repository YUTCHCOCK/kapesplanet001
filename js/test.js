// 예시 함수
function sum(a, b) {
  return a + b;
}

// 테스트 함수
function testSum() {
  if (sum(1, 2) === 3) {
    console.log('✅ sum(1, 2) = 3 테스트 통과');
  } else {
    console.error('❌ sum(1, 2) = 3 테스트 실패');
  }
}

// 모든 테스트 실행
function runTests() {
  testSum();
}

runTests();
