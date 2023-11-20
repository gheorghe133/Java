public class SubclassPolymorphism extends RuntimePolymorphism {
    public SubclassPolymorphism(String message) {
        super(message);
    }

    void display() {
        System.out.println("Clasa copil: " + getMessage());
    }
}
