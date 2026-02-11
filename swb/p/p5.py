from datetime import datetime

class CourseBookingSystem:
    def __init__(self):
        self.students = []
        self.bookings = []
    
    def enroll_student(self, name, email, course):
        student = {
            'id': len(self.students) + 1,
            'name': name,
            'email': email,
            'course': course,
            'enrolled_date': datetime.now().strftime('%Y-%m-%d')
        }
        self.students.append(student)
        self._send_welcome_email(student)
        return student
    
    def book_session(self, student_id, session_type, date_time):
        booking = {
            'id': len(self.bookings) + 1,
            'student_id': student_id,
            'type': session_type,
            'datetime': date_time,
            'status': 'confirmed'
        }
        self.bookings.append(booking)
        self._send_booking_confirmation(booking)
        return booking
    
    def _send_welcome_email(self, student):
        print(f"📧 Welcome email sent to {student['email']}")
        print(f"   Subject: Welcome to {student['course']}!")
    
    def _send_booking_confirmation(self, booking):
        print(f"📧 Booking confirmation sent")
        print(f"   Session: {booking['type']} on {booking['datetime']}")
    
    def get_dashboard(self):
        print(f"\n📊 DASHBOARD")
        print(f"Total Students: {len(self.students)}")
        print(f"Total Bookings: {len(self.bookings)}")
        print("\nRecent Enrollments:")
        for s in self.students[-3:]:
            print(f"  - {s['name']} ({s['course']})")

# Demo
system = CourseBookingSystem()
system.enroll_student("Jane Doe", "jane@email.com", "Herbalism 101")
system.book_session(1, "1-on-1 Consultation", "2024-03-15 10:00")
system.get_dashboard()