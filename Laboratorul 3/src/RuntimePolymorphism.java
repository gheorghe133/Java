public class RuntimePolymorphism {
    private String message;

    public RuntimePolymorphism(String message) {
        this.message = message;
    }

    void display() {
        System.out.println(message);
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}