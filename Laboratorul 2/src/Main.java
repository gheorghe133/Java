
public class Main {
    public static void main(String[] args) {
        // People
        People people = new People("John Wick");
        System.out.println("People: " + people);

        // Table
        Table table = new Table("IKEA");
        System.out.println("Table: " + table);

        // Car
        Car car = new Car("Toyota");
        System.out.println("Car: " + car);

        // Book
        Book book = new Book("JavaScript Programming");
        System.out.println("Book: " + book);

        // Setter
        people.setName("John Wick");
        car.setBrand("Honda");
        table.setBrand("JYSK");
        book.setTitle("Python Programming");

        // Getter
        System.out.println("People after modification: " + people.getName());
        System.out.println("Car after modification: " + car.getBrand());
        System.out.println("Table after modification: " + table.getBrand());
        System.out.println("Book after modification: " + book.getTitle());
    }
}
