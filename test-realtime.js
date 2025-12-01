// Test script để kiểm tra realtime ratings
// Chạy bằng: node test-realtime.js

import { io } from 'socket.io-client';

const socket = io('http://localhost:5000', {
  auth: { token: 'your-test-token-here' }, // Thay bằng token thật
  transports: ['websocket', 'polling']
});

socket.on('connect', () => {
  console.log('✅ Connected to socket server');

  // Listen for rating events
  socket.on('BE_NEW_RATING', (data) => {
    console.log('⭐ Received new rating:', data);
  });

  // Test emit rating
  setTimeout(() => {
    const testRating = {
      id: 'test-' + Date.now(),
      user: 'Test User',
      userId: 'test-user-id',
      rating: 5,
      comment: 'Test rating from script',
      createdAt: new Date().toISOString()
    };

    console.log('📤 Emitting test rating:', testRating);
    socket.emit('FE_NEW_RATING', testRating);
  }, 2000);
});

socket.on('disconnect', () => {
  console.log('❌ Disconnected from socket server');
});

socket.on('connect_error', (error) => {
  console.error('❌ Socket connection error:', error.message);
});

// Keep script running
setTimeout(() => {
  console.log('🔚 Test completed');
  process.exit(0);
}, 10000);
